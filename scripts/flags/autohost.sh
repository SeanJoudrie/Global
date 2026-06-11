#!/bin/bash
# Best-effort self-hosting loop: repeatedly run the downloader (it skips files
# already on disk and retries previous failures), regenerate the map, and commit
# any newly self-hosted flags. Stops when a pass adds (almost) nothing — i.e. the
# remaining files are persistently throttled/unavailable this session — or after
# a hard cap. Everything not downloaded keeps working via its Wikimedia hotlink.
set -u
cd /home/user/Global
BRANCH=claude/affectionate-ride-ns6jgo
MAX_PASSES=20

for i in $(seq 1 $MAX_PASSES); do
  before=$(ls public/flags/wm | wc -l)
  echo "=== pass $i start ($before files) $(date +%T) ==="
  node scripts/flags/selfhost.mjs >> /tmp/selfhost.log 2>&1
  node scripts/flags/generate.mjs >/dev/null 2>&1
  after=$(ls public/flags/wm | wc -l)
  added=$((after - before))
  echo "=== pass $i added $added (now $after) ==="

  git add -A
  if ! git diff --cached --quiet; then
    git commit -q -m "Self-host more working flags (auto pass $i, $after total)"
    for try in 1 2 3 4; do
      git push origin "$BRANCH" >/dev/null 2>&1 && break
      sleep $((try * 2))
    done
    # Keep main (the deployed branch) fast-forwarded to the same commit.
    for try in 1 2 3 4; do
      git push origin HEAD:main >/dev/null 2>&1 && break
      sleep $((try * 2))
    done
  fi

  # Converged: a pass that adds fewer than 5 new files means the rest are stuck.
  if [ "$added" -lt 5 ]; then
    echo "=== converged at pass $i ($after self-hosted) ==="
    break
  fi
done
echo "=== autohost done: $(ls public/flags/wm | wc -l) self-hosted $(date +%T) ==="

#!/usr/bin/env bash
# Publishes the portfolio to GitHub Pages at https://<user>.github.io
#
# Requires: the GitHub CLI, signed in (`gh auth login`).
# Creates the public repository <user>/<user>.github.io if it does not exist,
# pushes the current commit as a fresh history (private notes under
# docs/discovery and docs/superpowers are excluded via .gitattributes
# export-ignore), and switches Pages to deploy from GitHub Actions.
set -euo pipefail

USER_NAME="$(gh api user --jq .login)"
REPO="${USER_NAME}/${USER_NAME}.github.io"
ROOT="$(git rev-parse --show-toplevel)"
WORK="$(mktemp -d)"

echo "Publishing to ${REPO}"

if ! gh repo view "${REPO}" >/dev/null 2>&1; then
  gh repo create "${REPO}" --public --description "Portfolio of ${USER_NAME}: shipped Flutter apps, case studies and writing."
  FRESH=1
else
  FRESH=0
fi

MESSAGE="${1:-Publish portfolio}"
AUTHOR=(-c user.name="${USER_NAME}" -c user.email="${USER_NAME}@users.noreply.github.com")

if [ "${FRESH}" = "1" ]; then
  git -C "${ROOT}" archive --format=tar HEAD | tar -x -C "${WORK}"
  cd "${WORK}"
  git init -q -b main
  git add -A
  git "${AUTHOR[@]}" commit -q -m "${MESSAGE}"
  git remote add origin "https://github.com/${REPO}.git"
  git push -u origin main
else
  # Update: one new commit on top of the published history (never a force
  # push). The tree is replaced by the archived HEAD, so files deleted
  # locally are deleted there too, and export-ignored paths never arrive.
  git clone -q "https://github.com/${REPO}.git" "${WORK}"
  cd "${WORK}"
  git rm -q -r --ignore-unmatch . >/dev/null
  git -C "${ROOT}" archive --format=tar HEAD | tar -x -C "${WORK}"
  for private in docs/discovery docs/superpowers .superpowers; do
    if [ -e "${private}" ]; then
      echo "Refusing to publish: ${private} is present." >&2
      exit 1
    fi
  done
  git add -A
  if git diff --cached --quiet; then
    echo "Nothing to publish: the repository already matches HEAD."
    exit 0
  fi
  git "${AUTHOR[@]}" commit -q -m "${MESSAGE}"
  git push origin main
fi

# Deploy Pages from the workflow in .github/workflows/deploy.yml
gh api -X POST "repos/${REPO}/pages" -f build_type=workflow >/dev/null 2>&1 \
  || gh api -X PUT "repos/${REPO}/pages" -f build_type=workflow >/dev/null

echo "Pushed. The first deployment takes about five minutes:"
echo "  https://github.com/${REPO}/actions"
echo "  https://${USER_NAME,,}.github.io/"

#!/usr/bin/env bash
set -euo pipefail

echo "======================================================"
echo " 1. Deploying production build to /var/www/svgdad/html"
echo "======================================================"
mkdir -p /var/www/svgdad/html
cp -r /REPOS/svgdad/dist/* /var/www/svgdad/html/
chown -R www-data:www-data /var/www/svgdad/html
chmod -R 755 /var/www/svgdad/html
echo "Files deployed successfully."

echo "======================================================"
echo " 2. Testing and reloading Nginx ..."
echo "======================================================"
nginx -t
systemctl reload nginx
echo "Nginx reloaded successfully!"

echo "======================================================"
echo " 3. Fixing repository permissions and committing to Git"
echo "======================================================"
chown -R vscode:vscode /REPOS/svgdad
cd /REPOS/svgdad
git config --global --add safe.directory /REPOS/svgdad || true
git config user.name "MeRc-khz"
git config user.email "merc.khz@outlook.com"

git add .
if git diff --cached --quiet; then
    echo "No git changes to commit."
else
    git commit -m "feat(cart): Redesign shopping bag with slide-over drawer, 2-column layout, and Stripe flow"
    echo "Changes committed locally."
    echo "Pushing to GitHub..."
    git push || echo "Git push requires credentials or SSH key. If using a personal access token, run 'git push' manually."
fi

# Ensure workspace ownership remains vscode
chown -R vscode:vscode /REPOS/svgdad

echo "======================================================"
echo " DEPLOYMENT COMPLETE! https://svgdad.store is now live"
echo "======================================================"

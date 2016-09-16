cd ReactJsApp
npm run build
cd -
git commit -am "Save local changes"
git checkout -B gh-pages
git add -f ReactJsApp/build
git commit -am "Rebuild website"
git filter-branch -f --prune-empty --subdirectory-filter ReactJsApp/build
git push -f origin gh-pages
git checkout -

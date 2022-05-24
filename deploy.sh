// 發生錯誤時執行終止指令
set -e

// build
npm run build

// navigate into the build output directory 引導到輸出目錄位置
// dist: "distribution", the compiled code/library, also named public/ or build/. The files meant for production or public use are usually located here.
// dist 是用來放編譯後的代碼
cd dist

git init
git add -A
git commit -m "deploy"

// push 到 HTTPS，gh-pages
git push -f https://github.com/Rosette-xii/vue-GoGoDutch.git main:gh-pages

cd -
cd react-projects
for PROJECT_DIR in $(ls); do
    cd $PROJECT_DIR
    pnpm build && rm -rf ../../docs/$PROJECT_DIR && mv dist ../../docs/$PROJECT_DIR &
    echo $PROJECT_DIR scanned
    cd ../
done
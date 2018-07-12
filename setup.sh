# run from inside mern-discovery after first clone
cp .xinitrc ../.xinitrc
cp .browse ../.browse
chmod a+x ../.browse
chown alarm:alarm ../.browse

# run npm install on both directories
npm install
cd client/
npm install
cd ..

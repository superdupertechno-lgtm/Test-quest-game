# Install Python headers and Pip
sudo dnf install python3-pip python3-devel -y
# Re-run your dashboard setup (assuming you've moved the files back)
cd ~/Documents/sd/
python -m pip install -r requirements.txt
python -m streamlit run dashboard.py
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code -y
# Enable the Steam repository
sudo dnf install https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y
# Install Steam
sudo dnf install steam -y

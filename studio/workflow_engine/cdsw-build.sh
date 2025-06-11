# Currenly this build file is used just to set up basic packages for workflow deployment as a Workbench Model.
# Tool specific packages are installed in the workflow deployment script during runtime.

# NOTE: running this cdsw-build.sh script implies that the calling workbench has the
# model root dir feature of Workbench Models enabled. There is a separate build 
# script for workbenches that do not have this feature enabled.

# Install UV for venv tool usage
python -m pip install uv

# Get node
export NVM_DIR="$(pwd)/.nvm"
mkdir -p $NVM_DIR
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 22
nvm use 22

# Install engine code
pip install .

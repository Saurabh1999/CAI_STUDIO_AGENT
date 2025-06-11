# This cdsw-build.sh file will only be used when we are running in an 
# environment with custom model root dirs disabled. Because composable
# amps and AI Studios are enabled under the same entitlement, in our current
# state we will never hit this if agent-studio/ directory exists, because the
# existence of that directory implies the ML_ENABLE_COMPOSABLE_AMPS entitlement
# as well as the model root dir feature, are both available.

# That being said, just in case this specific model root dir feature is ever moved
# way from the entitlement separately from the rest of the AI Studios features, we
# need to make sure that we explicitly still check for the existence of the folder.

# Ensure uv is available
python -m pip install uv

# Get node
export NVM_DIR="$(pwd)/.nvm"
mkdir -p $NVM_DIR
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install 22
nvm use 22

if [ -d "/home/cdsw/agent-studio" ]; then
    echo "agent-studio/ directory exists but model root dir feature is disabled."
    pip install /home/cdsw/agent-studio/studio/workflow_engine/
else
    echo "model root dir feature is disabled AND agent studio was installed as an AMP."
    pip install /home/cdsw/studio/workflow_engine/
fi
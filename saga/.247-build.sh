set -e

npm install
mkdir -p logs

# To reduce 'checkmarx' false alerts, preemptively remove folders from node_modules whose name is 'test' or 'tests.
# In the unlikely but unfortunate event that dev or runtime dependencies rely on files in these 'test' subfolders
#   we'll hopefully fail during the next step.
find node_modules -type d \( -name "test" -o -name "tests" \) -prune | xargs -I{} rm -rf {}

npm run lint
npm run coverage

# when running on jenkins.home.247-inc.net,
# the build and deploy are part of the same workflow
if [[ -f ".247-deploy.sh" ]] && [[  -n "$JENKINS_CHROOT_BUILD" ]]
then
    source .247-deploy.sh
fi

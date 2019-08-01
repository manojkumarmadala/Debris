npm prune --production

ZIP_FILE=$SAFE_JOB_NAME.zip
# introduce an intermediary folder so unzipper need not unzip -d
# NOTE: all files in root containing a leading '.' are excluded
mkdir .$SAFE_JOB_NAME
mv * .$SAFE_JOB_NAME
mv .$SAFE_JOB_NAME $SAFE_JOB_NAME
# restore the logs to their original location for test result reporting purposes
mv $SAFE_JOB_NAME/logs .
mv $SAFE_JOB_NAME/coverage .

# bin + tools aren't present in the template repo,
#  but devs typically add them to help with development.
#  prune them from the artifact so they do not get pushed or get analyzed by code smell tools like checkmarx
zip -r $ZIP_FILE $SAFE_JOB_NAME \
  -x "$SAFE_JOB_NAME/*.sh" \
  -x "$SAFE_JOB_NAME/package-lock.json" \
  -x "$SAFE_JOB_NAME/test*" \
  -x "$SAFE_JOB_NAME/bin*" \
  -x "$SAFE_JOB_NAME/tools*" \
  -x "$SAFE_JOB_NAME/config*"

# since the files moved from their default location, re-educate the build
PACKAGE_JSON=$SAFE_JOB_NAME/package.json

nexus_deploy $ZIP_FILE
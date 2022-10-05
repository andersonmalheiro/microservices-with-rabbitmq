#!/bin/bash

#================================================================
# HEADER
#================================================================
#% SYNOPSIS
#+    ${SCRIPT_NAME} [-n[name]]
#%
#% DESCRIPTION
#%    This is a script template
#%    to start any good shell script.
#%
#% OPTIONS
#%    -n [name]    Create a migration with the given name (default location src/db/migrations)

#%
#% EXAMPLES
#%    ${SCRIPT_NAME} -n UserModel
#%
#================================================================
# END_OF_HEADER
#================================================================

SCRIPT_HEADSIZE=$(head -200 ${0} |grep -n "^# END_OF_HEADER" | cut -f1 -d:)
SCRIPT_NAME="$(basename ${0})"

  #== usage functions ==#
usagefull() { head -${SCRIPT_HEADSIZE:-99} ${0} | grep -e "^#[%+-]" | sed -e "s/^#[%+-]//g" -e "s/\${SCRIPT_NAME}/${SCRIPT_NAME}/g" ; }

if [ $# == 0 ]; then
    usagefull;
    exit 1;
fi

while getopts "n:" flag; do
    case "${flag}" in
    "n")
        migration_name=${OPTARG}
        ;;
    *)
        echo "$USAGE"
        exit 0
        ;;
    esac
done

if [ -z "$migration_name" ]; then
    echo "Name can't be empty!"
    exit 1
fi

timestamp=$(date +%s)

file_name="$timestamp - $migration_name.ts"
final_path="src/db/migrations/$file_name"

touch "$final_path"
cat "./migration-boilerplate.txt" >"$final_path"

echo "New migration created at $(pwd)/$final_path"

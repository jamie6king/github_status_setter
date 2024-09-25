# Github Status Setter
This simple NodeJS application will update your Github status with a randomly-selected one based on a theme.

## Status Groups
There are currently 1 status group:

- `pride` - a bunch of statuses based on pride :rainbow_flag:.

## Running
To run this program *(e.g, on a server)*, you can clone the repo, add the [environmental variables](#environmental-variables) to a `.env` file, and run the following commands:
```
yarn install
node server.js
```

A docker build is [coming soon](https://github.com/jamie6king/githubStatusSetter/issues/1).

### Environmental Variables
- `GITHUB_TOKEN` - a Github PAT with the `user` scope. ***(REQUIRED)***
- `STATUS_GROUP` - which group to get a random status from ***(REQUIRED)***

- `UPDATE_SCHEDULE` - a cron-formatted schedule to update the status *(optional)*
    - Defaults to `0 0 * * *` *(every day at midnight)*
- `RUN_ON_INIT` - decides if to update the status on first run or not *(optional)*
    - Defaults to `true` *(will update when program ran)*
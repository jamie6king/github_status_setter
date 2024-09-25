// Allow access to environmental variables.
import { config } from "dotenv"

// Github status updater
import { GitHubProfileStatus } from "github-profile-status"

// Status templates
import statusJson from "./status.json" assert { type: "json" }
import { scheduleJob } from "node-schedule"

// Import environmental variables
config()

async function main() {

    // Check that GITHUB_TOKEN is set
    if (!process.env.GITHUB_TOKEN) {
        console.error("Error: GITHUB_TOKEN not set!")
        return false
    }

    // Get access to profile status
    const profileStatus = new GitHubProfileStatus({
        token: process.env.GITHUB_TOKEN,
    })

    // Check that STATUS_GROUP is set
    const statusGroup = process.env.STATUS_GROUP
    if (!statusGroup) {
        console.error("Error: STATUS_GROUP not set!")
        return false
    }

    // Get list of statuses
    const statuses = statusJson[statusGroup]
    const status = statuses[Math.floor(Math.random()*statuses.length)]
    
    console.log("Setting status.")
    console.debug("Status: " + JSON.stringify(status))

    // Set status
    const result = await profileStatus.set({
        emoji: status.emoji,
        message: status.message
    })

    // Return result of setting status
    console.debug("Result: " + JSON.stringify(result))
}

// Get environmental variables
const updateSchedule = process.env.UPDATE_SCHEDULE || "0 0 * * *"
const runOnInit = ( process.env.RUN_ON_INIT === undefined ? true : (process.env.RUN_ON_INIT === "true") )

// Update status on first run
if (runOnInit == true) { 

    console.debug("This program will update status when first ran.")

    await main()

} else {

    console.debug("This program will not update status when first ran.")

}

// Schedule job to either user-defined cronjob or every day at midnight
const job = scheduleJob(updateSchedule, async () => {
    await main()
})
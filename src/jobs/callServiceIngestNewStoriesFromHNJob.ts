import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

interface IngestRequestResponse {
  success: boolean
  error?: { message: string }
  data?: { new_stories_saved: number; new_users_saved: number }
}

// Scheduled Service Call: ingest new stories from HN (default: every minute)
export default new cron.CronJob(
  process.env.SOURCE_HN_NEW_STORIES_CRON_TIME || '* * * * *',
  async () => {
    const servicesEndpoint = process.env.SERVICES_ENDPOINT

    if (!servicesEndpoint) throw 'missing services endpoint; check env'

    try {
      const startTime = Date.now()

      console.info(
        `[INFO:NewStories] starting scheduled service call for ingesting new stories from HN with limit of ${process.env.SOURCE_HN_NEW_STORIES_LIMIT}`
      )

      const requestUrl = `${servicesEndpoint}/ingest/new-stories?dataSource=hn&limit=${process.env.SOURCE_HN_NEW_STORIES_LIMIT}`

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.INGEST_API_KEY}`
        }
      })

      const { error, data } = (await response.json()) as IngestRequestResponse

      if (!data || error) {
        console.error(
          `[ERROR:NewStories] unable to complete service call... ${
            error?.message || 'unknown error'
          }`
        )

        return
      }

      const { new_stories_saved, new_users_saved } = data,
        msToComplete = Date.now() - startTime

      // TODO: post msToComplete to _logs service

      console.info(
        `[INFO:NewStories] completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms...`
      )
      console.info(
        `[INFO:NewStories]...successfully saving ${new_stories_saved} new stories and ${new_users_saved} new users`
      )
    } catch (error) {
      console.error(`[ERROR:NewStories] ${(error as Error).message}`)
    }
  },
  null,
  false,
  'America/Chicago',
  null
)

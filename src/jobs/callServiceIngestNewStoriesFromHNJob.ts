import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

interface IngestRequestResponse {
  data: { total_stories_saved: number; total_users_saved: number }
}

// Scheduled Service Call: ingest new stories from HN (default: every minute)
export default new cron.CronJob(
  process.env.SOURCE_HN_NEW_STORIES_CRON_TIME || '* * * * *',
  async () => {
    try {
      const startTime = Date.now()

      console.info(
        `[INFO:NewStories] starting scheduled service call for ingesting new stories from HN with limit of ${process.env.SOURCE_HN_NEW_STORIES_LIMIT}`
      )

      const requestUrl = `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.meatballs.live'
      }/api/services/ingest/new-stories?dataSource=hn&limit=${
        process.env.SOURCE_HN_NEW_STORIES_LIMIT
      }`

      const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.INGEST_API_KEY}`
          }
        }),
        { total_stories_saved, total_users_saved } = (
          (await response.json()) as IngestRequestResponse
        ).data,
        msToComplete = Date.now() - startTime

      // TODO: post msToComplete to _logs service

      console.info(
        `[INFO:NewStories] completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms...`
      )
      console.info(
        `[INFO:NewStories]...successfully saving ${total_stories_saved} new stories and ${total_users_saved} new users`
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

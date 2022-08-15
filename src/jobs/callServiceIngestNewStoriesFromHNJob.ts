import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

interface IngestRequestResponse {
  data: { totalStoriesSaved: number }
}

// Scheduled Service Call: ingest new stories from HN (default: every minute)
export default new cron.CronJob(
  process.env.SOURCE_HN_NEW_STORIES_CRON_TIME || '* * * * *',
  async () => {
    try {
      const startTime = Date.now()

      console.info(
        `[INFO:NewStories] starting scheduled service call for ingesting new stories from HN with max of ${process.env.SOURCE_HN_MAX_NEW_STORIES}`
      )

      const requestUrl = `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.meatballs.live'
      }/api/services/ingest/new-stories?dataSource=hn&max=${
        process.env.SOURCE_HN_MAX_NEW_STORIES
      }`

      const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.INGEST_API_KEY}`
          }
        }),
        { totalStoriesSaved } = (
          (await response.json()) as IngestRequestResponse
        ).data,
        msToComplete = Date.now() - startTime

      // TODO: post msToComplete to _status service

      console.info(
        `[INFO:NewStories] completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms, saving ${totalStoriesSaved} new stories`
      )
    } catch (error) {
      console.error(`[ERROR:NewStories] ${(error as Error).message}`)
    }
  },
  null,
  true,
  'America/Chicago',
  null
)

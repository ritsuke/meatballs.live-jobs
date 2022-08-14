import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

interface IngestRequestResponse {
  data: { total: number }
}

const NODE_ENV = process.env.NODE_ENV

console.info(`ENVIRONMENT: ${NODE_ENV}`)

// Scheduled Service Call: ingest new stories from HN (default: every minute)
const callServiceIngestNewStoriesFromHNJob = new cron.CronJob(
  process.env.SOURCE_HN_CRON_TIME || '* * * * *',
  async () => {
    try {
      const startTime = Date.now()

      console.info(
        `starting scheduled service call for ingesting new stories from HN with max of ${process.env.SOURCE_HN_MAX_NEW_STORIES}`
      )

      const requestUrl = `${
        NODE_ENV === 'development'
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
        totalStoriesSaved = ((await response.json()) as IngestRequestResponse)
          .data.total,
        msToComplete = Date.now() - startTime

      // TODO: save msToComplete to ingest status/performance time series

      console.info(
        `completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms, saving ${totalStoriesSaved} new stories`
      )
    } catch (error) {
      console.error(error)
    }
  },
  null,
  true,
  'America/Chicago',
  null
)

console.info(
  'started call service job for ingesting new stories from source hn'
)
callServiceIngestNewStoriesFromHNJob.start()

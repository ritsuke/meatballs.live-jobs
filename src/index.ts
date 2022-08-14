import 'dotenv/config'

import cron from 'cron'
import fetch from 'node-fetch'

// Scheduled Service Call: ingest new stories from HN (default: every minute)
const callServiceIngestNewStoriesFromHNJob = new cron.CronJob(
  process.env.SOURCE_HN_CRON_TIME || '* * * * *',
  async () => {
    try {
      const startTime = Date.now()

      console.info(
        `starting scheduled service call for ingesting new stories from HN with max of ${process.env.SOURCE_HN_MAX_NEW_STORIES}`
      )

      await fetch(
        `https://www.meatballs.live/api/services/ingest/new-stories?apiKey=${process.env.INGEST_API_KEY}&dataSource=hn&max=${process.env.SOURCE_HN_MAX_NEW_STORIES}`,
        { method: 'GET' }
      )

      const msToComplete = Date.now() - startTime

      // TODO: save msToComplete to ingest status/performance time series

      console.info(
        `completed scheduled service call for ingesting new stories from HN in ${msToComplete}ms`
      )
    } catch (error) {
      console.error(error)
    }
  },
  null,
  false,
  'America/Chicago',
  null
)

console.info(
  'started call service job for ingesting new stories from source hn'
)
callServiceIngestNewStoriesFromHNJob.start()

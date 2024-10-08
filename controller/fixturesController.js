const { getTeams, scrapeFixtureMatches, scrapeAndSaveSeries } = require("../service/fixtureService");
const { cacheMiddleware } = require("../utility");

async function getFixtureMatch(req, res) {
    try {
        const matches = await scrapeFixtureMatches(req.query.offset);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the data' });
    }
}
async function getTeamFixtureMatch(req, res) {
    const { searchTerm, page } = req.query;
    try {
        const data = await getTeams(page, 100, searchTerm)
        res.json(data);
    } catch (error) {
        console.error('Error scraping navbar data:', error);
        res.status(500).json({ error: 'Failed to scrape navbar data' });
    }
}
async function getSeriesFixture(req, res) {
    try {
        const data = await scrapeAndSaveSeries(process.env.BASE + '/fixtures/series-list', req.query.offset)
        res.json(data);
    } catch (error) {
        console.error('Error scraping navbar data:', error);
        res.status(500).json({ error: 'Failed to scrape navbar data' });
    }
}
module.exports = {
    getFixtureMatch: [cacheMiddleware, getFixtureMatch],
    getTeamFixtureMatch: [cacheMiddleware, getTeamFixtureMatch],
    getSeriesFixture: [cacheMiddleware, getSeriesFixture],
};
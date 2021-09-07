require("../index")

const assert = require('assert');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'data'.
let data = require("../models/data.model").data;
let expect = require("chai").expect

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Checking worker', () => {
    
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('compare data count in some time span', async () => {
        // Check the current count in DB
        let before = await data.countDocuments()

        // Wait for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Check the current count in DB
        let after = await data.countDocuments()

        // Count in the DB must be greater when our worker is running
        expect(after).to.be.greaterThan(before)

    })
})
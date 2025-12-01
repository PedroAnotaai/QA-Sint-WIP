import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { apiConfig, loadPayload } from '../../utils/api-confing.js';
import path from 'path';



test.describe('Qualification Rule Service - lead endpoint', () => {

    qase(81,
        test('[SQL] Social || Tiktok - Pedidos, computador e fit', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "Tiktok";
            payload.utmCampaign = "-whatsapp";

            const response = await request.post(`${apiConfig.baseURLQualificationRuleSTG}/lead`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: payload,
            });

            const responseBody = await response.json();
            console.log(JSON.stringify(responseBody));

            expect(response.status()).toBe(201);
            expect(responseBody).toHaveProperty('leadType', 'SQL');
            expect(responseBody).toHaveProperty('qualificationRule', 'Pedidos, computador e fit');
            expect(responseBody).toHaveProperty('leadOrigin', 'Tiktok Social');
            expect(responseBody).toHaveProperty('tierQualification', '');

        })
    )    
});
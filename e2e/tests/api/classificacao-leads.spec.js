import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { apiConfig, loadPayload } from '../../utils/api-config.js';
import path from 'path';



test.describe('Qualification Rule Service - lead endpoint', () => {

    qase(81,
        test('[SQL] Social || Tiktok - Pedidos, computador e fit', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "Tiktok";
            payload.utmCampaign = "-whatsapp";

            console.log(apiConfig)
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
    );
    
    qase(82,
        test('[SQL] Social || Instagram Ads - Pedidos, computador e fit', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "Instagram";
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
            expect(responseBody).toHaveProperty('leadOrigin', 'Instagram Social');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    )

    qase(83,
        test('[SQL] Social || Facebook Ads - Pedidos, computador e fit', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "Facebook";
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
            expect(responseBody).toHaveProperty('leadOrigin', 'Facebook Social');
            expect(responseBody).toHaveProperty('tierQualification', '');


        })
    );

    qase(84,
        test('[SQL] Outros - Pedidos, computador e fit (utmSource: google e utmCampaign: anotaai_br_g-pmax_conversao-campanha_)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "google";
            payload.utmCampaign = "anotaai_br_g-pmax_conversao-campanha_";
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
            expect(responseBody).toHaveProperty('leadOrigin', 'Outros');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    );    

    qase(85,
        test('[SQL] Orgânico - Pedidos, computador e fit (utmSource: null e utmCampaign: anotaai_br_g-pmax_conversao-campanha_)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = null;
            payload.utmCampaign = "anotaai_br_g-pmax_conversao-campanha_";
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
            expect(responseBody).toHaveProperty('leadOrigin', 'Orgânico Direto');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })
    );

    qase(86,
        test('[SQL] Orgânico - Secundário: Curadoria', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmMedium = 'curadoria';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Curadoria');
            expect(responseBody).toHaveProperty('leadOrigin', 'Orgânico Direto');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })
    );

    qase(87,
        test('[SQL] Orgânico - Secudário: Orgânico - utm_source: NULL', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = null;
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Organico');
            expect(responseBody).toHaveProperty('leadOrigin', 'Orgânico Direto');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        
        })
    );

    qase(88,
        test('[SQL] Outros - Secundário: Institucional (utmSource: bing, utmTerm: anota)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = "bing";
            payload.utmTerm = "anota";
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Institucional');
            expect(responseBody).toHaveProperty('leadOrigin', 'Outros');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');

        })    
    );

    qase(89,
        test('[SQL] Secundário: Outros - Indique e Ganhe - Institucional)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'bing';
            payload.utmTerm = 'anota';
            payload.isIndicated = 'true';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Institucional');
            expect(responseBody).toHaveProperty('leadOrigin', 'Indique e Ganhe');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })

        
    );

    qase(90,
        test('[SQL] Secundário: Social || Instagram Ads - Indicado', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'ig';
            payload.isIndicated = 'true';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Indicado');
            expect(responseBody).toHaveProperty('leadOrigin', 'Indique e Ganhe');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })
    );

    qase(91,
        test('[SQL] Secundário: Social || Instagram Ads - Parceiro(partner)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'ig';
            payload.partner = 'a';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Parceiro(partner)');
            expect(responseBody).toHaveProperty('leadOrigin', 'Parceiro');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    );

    qase(92,
        test('[SQL] Secundário: Social || Facebook Ads - Social (utmCampaign: "post", utmSource: fb)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'fb';
            payload.utmCampaign = 'post';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Social');
            expect(responseBody).toHaveProperty('leadOrigin', 'Facebook Social');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    )

    qase(93,
        test('[SQL] Secundário: Social || Facebook Ads - Social  (utmCampaign: "button", utmSource: facebook)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'facebook';
            payload.utmCampaign = 'button';

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
            expect(responseBody).toHaveProperty('qualificationRule', 'Social');
            expect(responseBody).toHaveProperty('leadOrigin', 'Facebook Social');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    );

    qase(94,
        test('[SQL] Secundário: Outros - Social (utmSource: youtube)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.utmSource = 'youtube';

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
            expect(responseBody).toHaveProperty('qualificationRule', 'Social');
            expect(responseBody).toHaveProperty('leadOrigin', 'YouTube Social');
            expect(responseBody).toHaveProperty('tierQualification', '');
        })
    );

    qase(95,
        test('[SQL] Secundário: Organico (siteOrigem: Whatsapp Live Chat e FIT False)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.siteOrigem = 'Whatsapp Live Chat';
            payload.fit = false;
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Organico');
            expect(responseBody).toHaveProperty('leadOrigin', 'Orgânico Direto');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })
    );

    qase(96,
        test('[SQL] Secundário: Organico (siteOrigem: Whatsapp Live Chat e FIT TRUE)', async ({ request }) => {
            const payload = loadPayload('e2e/fixtures/payload-sql-secundario.json')
            payload.email = `${Math.random().toString(36).substring(2, 10)}@anota.ai`;
            payload.siteOrigem = 'Whatsapp Live Chat';
            payload.utmCampaign = 'anotaai_br_g-pmax_conversao-campanha_';
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
            expect(responseBody).toHaveProperty('qualificationRule', 'Organico');
            expect(responseBody).toHaveProperty('leadOrigin', 'Orgânico Direto');
            expect(responseBody).toHaveProperty('tierQualification', 'Gold_D0');
        })
    );

    



    
});
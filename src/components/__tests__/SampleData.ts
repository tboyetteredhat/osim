import { type ZodFlawType } from '@/types/zodFlaw';

export function sampleFlaw(): ZodFlawType {
  return {
    uuid: '3ede0314-a6c5-4462-bcf3-b034a15cf106',
    cve_id: 'CVE-2007-97239',
    // resolution: '',
    impact: 'LOW',
    component: 'reality.',
    title: 'sample title',
    trackers: [],
    comment_zero: 'Comment Zero == Patient Zero',
    cve_description: 'I am a spooky CVE',
    requires_cve_description: 'APPROVED',
    statement: 'Statement for None',
    cwe_id: 'CWE-1',
    unembargo_dt: '[native Date Thu Nov 30 2023 21:52:48 GMT-0500 (Eastern Standard Time)]',
    source: 'GIT',
    reported_dt: '[native Date Sun Oct 05 1975 03:45:17 GMT-0400 (Eastern Daylight Time)]',
    mitigation: 'CVE mitigation',
    major_incident_state: 'APPROVED',
    nist_cvss_validation: '',
    alerts: [],
    affects: [
      {
        uuid: 'bff95399-ef12-43fe-878d-4629297c2aa8',
        flaw: '3ede0314-a6c5-4462-bcf3-b034a15cf106',
        affectedness: 'AFFECTED',
        resolution: 'FIX',
        ps_module: 'openshift-4',
        ps_component: 'openshift',
        impact: 'LOW',
        trackers: [],
        delegated_resolution: null,
        cvss_scores: [],
        embargoed: false,
        created_dt: '2021-09-13T09:09:38Z',
        updated_dt: '2023-12-06T17:12:21Z',
        alerts: [],
      },
    ],
    comments: [
      {
        uuid: '0d90cb33-cbdc-4bd8-bef0-7b5c7f33ece2',
        external_system_id: '15302346',
        order: 0,
        meta_attr: {
          id: '15302346',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2021-09-13T09:09:38Z',
          count: '0',
          bug_id: '1984541',
          creator: 'ex-maple@example.com',
          creator_id: '412888',
          is_private: false,
          attachment_id: null,
          creation_time: '2021-09-13T09:09:38Z',
          private_groups: '[]',
        },
        created_dt: '2021-09-13T09:09:38Z',
        updated_dt: '2021-09-13T09:09:38Z',
        alerts: [],
      },
      {
        uuid: 'b6e8870e-5f7a-46d7-bb2f-40910b75b6a4',
        external_system_id: '15302351',
        order: 1,
        meta_attr: {
          id: '15302351',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2021-09-13T09:12:33Z',
          count: '1',
          bug_id: '1984541',
          creator: 'ex-maple@example.com',
          creator_id: '412888',
          is_private: true,
          attachment_id: null,
          creation_time: '2021-09-13T09:12:33Z',
          private_groups: '[\'nunya\']',
        },
        created_dt: '2021-09-13T09:12:33Z',
        updated_dt: '2021-09-13T09:12:33Z',
        alerts: [],
      },
      {
        uuid: 'dffc4966-3442-46a4-98b8-2fd542addba0',
        external_system_id: '15392392',
        order: 2,
        meta_attr: {
          id: '15392392',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2022-03-12T08:34:13Z',
          count: '2',
          bug_id: '1984541',
          creator: 'former-maple@example.com',
          creator_id: '171532',
          is_private: 'True',
          attachment_id: null,
          creation_time: '2022-03-12T08:34:13Z',
          private_groups: '[\'nunya\']',
        },
        created_dt: '2022-03-12T08:34:13Z',
        updated_dt: '2022-03-12T08:34:13Z',
        alerts: [],
      },
      {
        uuid: '7edd4365-d12e-4873-a1ea-1cf2f7110391',
        external_system_id: '15596524',
        order: 3,
        meta_attr: {
          id: '15596524',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2023-07-13T01:07:34Z',
          count: '3',
          bug_id: '1984541',
          creator: 'former-maple@example.com',
          creator_id: '171532',
          is_private: 'True',
          attachment_id: null,
          creation_time: '2023-07-13T01:07:34Z',
          private_groups: '[\'nunya\']',
        },
        created_dt: '2023-07-13T01:07:34Z',
        updated_dt: '2023-07-13T01:07:34Z',
        alerts: [],
      },
      {
        uuid: '8f5b04e2-d62e-4330-b42f-634d41457033',
        external_system_id: '15607332',
        order: 4,
        meta_attr: {
          id: '15607332',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2023-07-13T02:06:48Z',
          count: '4',
          bug_id: '1984541',
          creator: 'former-maple@example.com',
          creator_id: '171532',
          is_private: 'True',
          attachment_id: null,
          creation_time: '2023-07-13T02:06:48Z',
          private_groups: '[\'nunya\']',
        },
        created_dt: '2023-07-13T02:06:48Z',
        updated_dt: '2023-07-13T02:06:48Z',
        alerts: [],
      },
      {
        uuid: 'cfc38ae1-7afe-41fe-b66a-5b46acbaba3a',
        external_system_id: '15614647',
        order: 5,
        meta_attr: {
          id: '15614647',
          tags: '[]',
          text: 'Dictum maecenas congue quis quam phasellus aenean',
          time: '2023-07-13T02:39:44Z',
          count: '5',
          bug_id: '1984541',
          creator: 'former-maple@example.com',
          creator_id: '171532',
          // is_private: 'True',
          is_private: true,
          attachment_id: null,
          creation_time: '2023-07-13T02:39:44Z',
          private_groups: '[\'nunya\']',
        },
        created_dt: '2023-07-13T02:39:44Z',
        updated_dt: '2023-07-13T02:39:44Z',
        alerts: [],
      },
    ],
    meta_attr: { bz_id: '1984541' },
    // package_versions: [],
    acknowledgments: [],
    references: [],
    cvss_scores: [
      {
        comment: 'The CVSS is as it is and that is it.',
        cvss_version: 'V3',
        flaw: 'beeeeep',
        issuer: 'RH',
        score: 2.2,
        uuid: 'cvsss-beeeep',
        vector: 'CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:L/I:N/A:N',
        embargoed: false,
        created_dt: '2021-08-02T10:49:35Z',
        updated_dt: '2024-03-04T14:27:02Z',
        alerts: [],
      },
      {
        comment: 'The CVSS is as it is and that is it.',
        cvss_version: 'V3',
        flaw: 'beeeeep',
        issuer: 'NIST',
        score: 4,
        uuid: 'cvsss-beeeep',
        vector: 'CVSS:3.1/AV:N/AC:H/PR:E/UI:N/S:U/C:N/I:L/A:R',
        embargoed: false,
        created_dt: '2021-08-02T10:49:35Z',
        updated_dt: '2024-03-04T14:27:02Z',
        alerts: [],
      },
    ],
    embargoed: false,
    // created_dt: '2021-09-13T09:09:38Z',
    updated_dt: '2023-12-06T17:12:21Z',
    classification: { workflow: 'DEFAULT', state: 'NEW' },
    // group_key: '',
    owner: '',
    // task_key: '',
    team_id: '',
    // dt: '2024-01-17T22:31:19.131516Z',
    // revision: 'b61be72c3b93b2f307d8f4ebfd7db64ec4c81f9c',
    // version: '3.5.2',
    // env: 'stage',
  };
}


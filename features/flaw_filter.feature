Feature: Flaw filter testing

    Background: Before run scenarios
      Given I am an analyst AND I am logged into OSIM
      And I am on the flaw list

    Scenario: Filter the flaws with title keyword
      When I input a filter keyword "title" in the "Filter Issues/Flaws" input box
      Then I am able to view flaws matching "title keyword" and the flaws "count" is correct

    Scenario: Filter the flaws with cve_id keyword
      When I input a filter keyword "cve_id" in the "Filter Issues/Flaws" input box
      Then I am able to view flaws matching "cve_id" and the flaws "count" is correct

    Scenario: Filter the flaws with source keyword
      When I input a filter keyword "source" in the "Filter Issues/Flaws" input box
      Then I am able to view flaws matching "source" and the flaws "count" is correct

    Scenario: Filter my issues
      Given I set the bugzilla api key and jira api key
      Given I assgin one issue to me
      When I check 'My Issues' checkbox in index page
      Then All issues assigned to me should be listed in flaw table

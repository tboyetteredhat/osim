import json
import requests
import urllib.parse
from seleniumpagefactory.Pagefactory import PageFactory
from selenium.webdriver.common.by import By
from features.constants import OSIDB_URL


class AdvancedSearchPage(PageFactory):

    def __init__(self, driver):
        self.driver = driver
        self.timeout = 15

    locators = {
        "searchBtn": ('XPATH', '//button[contains(text(), "Search")]'),
        "firstFlaw": ("XPATH", "//div[@class='osim-incident-list']/table/tbody/tr[1]"),
        "selectKeyList": ("XPATH", "//select[@class='form-select search-facet-field']"),
        "selectValueList": ("XPATH", "//select[@class='form-select']"),
        "inputTextWindow": ("XPATH", "//details/form/div/input[@class='form-control']"),
        "selectKeyList2": ("XPATH", "(//select[@class='form-select search-facet-field'])[2]"),
        "selectValueList2": ("XPATH", "(//select[@class='form-select'])[2]"),
        "cve_idText": ("XPATH", "//tr[1]/td[2]/a"),
        "impactText": ("XPATH", "//tr[1]/td[3]"),
        "sourceText": ("XPATH", "//tr[1]/td[4]"),
        "titleText": ("XPATH", "//tr[1]/td[6]"),
        "workflow_stateText": ("XPATH", "//tr[1]/td[7]"),
        "ownerText":  ("XPATH", "//tr[1]/td[8]"),
        "closeKeysetBtn": ("XPATH", "//button[@class='osim-toast-close-btn btn-close']"),
        "closeSelBtn": ("XPATH", "//i[@class='bi-x']"),
        "embargoedFlag": ("XPATH", "(//span[contains(text(), 'Embargoed')])[1]")
    }

    def click_search_btn(self):
        self.searchBtn.click_button()

    def first_flaw_exist(self):
        self.firstFlaw.visibility_of_element_located()

    def first_flaw_embargoed_flag_exist(self):
        self.embargoedFlag.visibility_of_element_located()

    def select_field_and_value_to_search(self, item_key, item_value):
        self.selectKeyList.click_button()
        self.selectKeyList.select_element_by_value(item_key)
        try:
            if self.driver.find_element(By.XPATH, "//details/form/div/input[@class='form-control']"):
                self.inputTextWindow.set_text(item_value)
        except:
            self.selectValueList.click_button()
            self.selectValueList.select_element_by_value(item_value)

    def select_second_field_and_value_to_search(self, item_key, item_value):
        self.selectKeyList2.click_button()
        self.selectKeyList2.select_element_by_value(item_key)
        self.selectValueList2.click_button()
        self.selectValueList2.select_element_by_value(item_value)

    def go_to_first_flaw_detail(self):
        self.cve_idText.click_button()
 
    def get_first_flaw_id(self):
        return self.cve_idText.get_text()

    def get_field_value_from_flawlist(self, field):
        field_value = getattr(self, field + 'Text')
        return  field_value.get_text()

    def close_setting_keys_window(self):
        self.closeKeysetBtn.click_button()

    def clear_search_select(self):
        self.closeSelBtn.click_button()

    def get_value_from_osidb(self, field, token):
        url = urllib.parse.urljoin(OSIDB_URL, "osidb/api/v1/flaws")
        first_flaw_id = self.get_first_flaw_id()
        headers = {"Authorization": f"Bearer {token}"}
        if "CVE" in first_flaw_id:
            params = {"cve_id": first_flaw_id}
        else:
            params = {"uuid": first_flaw_id}
        r = requests.get(url, params = params, headers = headers)
        flaw_info = json.loads(r.text).get('results')[0]
        # Get the values that related to affects
        field_value = []
        if "affects" in field:
            #Get the affects__ps_component and affects__ps_module values
            if "trackers" not in field:
                field = field.split("__")[-1]
                for item in flaw_info.get('affects'):
                    if item.get(field):
                        field_value.append(item.get(field))
            # Get the affects' tracters' values
            else:
                if "errata" not in field:
                    field = field.split("__")[-1]
                    for item in flaw_info.get('affects'):
                        if item.get('trackers'):
                            for tracker in item.get('trackers'):
                                if tracker.get(field):
                                    field_value.append(tracker.get(field))
                # Get the errata's related values
                else:
                    field = field.split("__")[-1]
                    for item in flaw_info.get('affects'):
                        if item.get('trackers'):
                            for tracker in item.get('trackers'):
                                if tracker.get('errata'):
                                    for errata in tracker.get('errata'):
                                        if errata.get(field):
                                            field_value.append(errata.get(field))
            return field_value
        # Get the acknowledgment name values
        elif "acknowledgments" in field:
            for ack in flaw_info.get('acknowledgments'):
                if ack.get('name'):
                    field_value.append(ack.get('name'))
            return field_value
        elif "cvss_scores" in field:
            if field == "cvss_scores__score":
                for cvss_score in flaw_info.get('cvss_scores'):
                    if cvss_score.get('score'):
                        field_value.append(str(cvss_score.get('score')))
            if field == "cvss_scores__vector":
                for cvss_score in flaw_info.get('cvss_scores'):
                    if cvss_score.get('vector'):
                        field_value.append(cvss_score.get('vector'))
            return field_value
        # Get the other values
        else:
            return flaw_info.get(field)
import { HTTPClient } from "./config";
import { API_URL } from "constants/api";

export const fetchGallery = (query) => {
    let baseOptions = {
        key: '34579319-e65916c8fd3357218f04822ae',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 12,
        q: query,
    };

    return  HTTPClient
      .get(
        API_URL, {params: baseOptions}
      )
      .then(({ data }) => ({
        items: data.hits,
        amount: data.hits.length,
        }));

};
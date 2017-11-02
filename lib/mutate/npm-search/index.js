import axios from "axios";
import _ from "lodash";
import { MutationPrefix } from "../constants";

const RegistryURL = "https://registry.npmjs.org";
const SearchRoute = "/-/v1/search";

function search(query) {
  // If there's a query and it already has the prefix, don't include it
  let prefix = _.trimEnd(MutationPrefix, "-");
  if (query && query.includes && query.includes(prefix)) {
    prefix = "";
  }

  // If there's no query, just search for all aurora mutations
  let text = prefix;
  if (query) {
    text += "-" + query;
  }

  return axios.get(RegistryURL + SearchRoute, {
    params: {
      text
    }
  });
}

export default search;

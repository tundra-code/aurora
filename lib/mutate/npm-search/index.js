import axios from "axios";
import str from "string";
import { MutationPrefix } from "../constants";

const RegistryURL = "https://registry.npmjs.org";
const SearchRoute = "/-/v1/search";

function search(query) {
  // If there's a query and it already has the prefix, don't include it
  let prefix = str(MutationPrefix).chompRight("-");
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

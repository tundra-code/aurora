import Sea from "sea-floor";
import path from "path";

// Loads in "Core" onto the electron page.
Sea.open(path.resolve(__dirname, "../../aurora-core/index.js"));

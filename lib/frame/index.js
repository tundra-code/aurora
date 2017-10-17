import { Background } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";

const Frame = () => <Background className="background" />;

export default mutate(Frame, "Frame");

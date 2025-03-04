import type { Preview } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/Store";
import { ToastContainer } from "react-toastify";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ToastContainer position="top-center" autoClose={3000} />
        <BrowserRouter>
          <div style={{ marginTop: "60px" }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default preview;

import { shallowMount } from "@vue/test-utils";
import Loading from "../../src/views/Loading";
import Messages from "../../src/views/messages/Mesages";

describe("Loading.vue", () => {
  it("should render cubes", async () => {
    const wrapper = shallowMount(Loading);
    const cubes = wrapper.findAll('[data-testid="cube"]');
    expect(cubes.length).toBe(2);
  });
});

describe("Messages.vue", () => {
  it("button should be rendered", async () => {
    const wrapper = shallowMount(Messages);
    expect(wrapper.text()).toContain("mdi-plus");
  });
});

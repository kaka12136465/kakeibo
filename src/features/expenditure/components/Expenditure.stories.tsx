import type {Meta, StoryObj} from "@storybook/react";
import {ComponentPreview} from "./ComponentPreview"

const meta: Meta<typeof ComponentPreview> = {
    component: ComponentPreview,
    title: "Components/ComponentPreview"
}

export default meta;

type Story = StoryObj<typeof ComponentPreview>

export const Primary: Story = {}
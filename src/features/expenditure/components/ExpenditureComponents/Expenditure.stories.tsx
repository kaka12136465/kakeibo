import type {Meta, StoryObj} from "@storybook/react";
import {ExpenditureComponentPreview} from "../ExpenditureComponentPreview"

const meta: Meta<typeof ExpenditureComponentPreview> = {
    component: ExpenditureComponentPreview,
    title: "ExpenditureComponents/ExpenditureComponentPreview"
}

export default meta;

type Story = StoryObj<typeof ExpenditureComponentPreview>

export const Primary: Story = {}
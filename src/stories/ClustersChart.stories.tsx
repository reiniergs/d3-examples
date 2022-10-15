import { ComponentMeta, ComponentStory } from '@storybook/react'
import ClusterChart from '../components/ClusterBarChart'
import { data } from '../components/ClusterBarChart/data'

const Default: ComponentMeta<typeof ClusterChart> = {
  title: 'Library/ClusterBarChart',
  component: ClusterChart,
  argTypes: {}
}

export default Default

const Template: ComponentStory<typeof ClusterChart> = (args) => <ClusterChart {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data
}

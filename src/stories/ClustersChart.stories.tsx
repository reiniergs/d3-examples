import { ComponentMeta, ComponentStory } from '@storybook/react'
import ClusterChart from '../components/ClustersBarChart'
import { data } from '../components/ClustersBarChart/data'

const Default: ComponentMeta<typeof ClusterChart> = {
  title: 'Library/ClustersBarChart',
  component: ClusterChart,
  argTypes: {}
}

export default Default

const Template: ComponentStory<typeof ClusterChart> = (args) => <ClusterChart {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data
}

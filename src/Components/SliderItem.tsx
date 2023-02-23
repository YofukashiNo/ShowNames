import { common, components } from "replugged";
import * as Types from "../types";
const { React } = common;
const { FormItem, Slider } = components;
export class SliderItem extends React.Component {
  props: Types.SliderItemProps;
  render() {
    return (
      <FormItem
        title={this.props.title}
        style={{ marginBottom: 20 }}
        note={this.props.note}
        notePosition="after"
        divider>
        <Slider {...this.props} />
      </FormItem>
    );
  }
}

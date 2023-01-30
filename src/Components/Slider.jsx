import { common, components } from "replugged";
import { Slider as SliderComponent } from "../lib/requiredModules.jsx";
const { React } = common;
const { Text } = components;

export class Slider extends React.Component {
  render() {
    return (
      <div>
        <div
          {...{
            style: {
              padding: "0px 0px 5px 0px",
            },
          }}>
          <Text.Eyebrow>{this.props.name}</Text.Eyebrow>
        </div>
        <SliderComponent
          {...{
            ...this.props,
          }}></SliderComponent>
        <div
          {...{
            style: {
              padding: "5px 0px 25px 0px",
            },
          }}>
          <Text.Normal>{this.props.note}</Text.Normal>
        </div>
      </div>
    );
  }
}

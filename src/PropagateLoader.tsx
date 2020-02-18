/** @jsx jsx */
import * as React from "react";
import { keyframes, css, jsx } from "@emotion/core";
import { Keyframes } from "@emotion/serialize";

import { sizeDefaults, parseLengthAndUnit } from "./helpers";
import {
  StyleFunction,
  PrecompiledCss,
  LoaderSizeDistanceProps,
  StyleFunctionWithIndex,
  LengthObject
} from "./interfaces";

class Loader extends React.PureComponent<LoaderSizeDistanceProps> {
  public static defaultProps: LoaderSizeDistanceProps = sizeDefaults(15);

  private getPropagate(): Keyframes[] {
    let distance: string[];
    let propagate: Keyframes[] = [];
    let propagation: Array<LengthObject> = [];

    if(this.props.distance) {
      distance = this.props.distance;
    }
    else {
      distance = ['2rem','4rem', '6rem'];
    }

    for (var i = 0; i < distance.length; i++) {
      let { value, unit } = parseLengthAndUnit(distance[i]!);
      let propagationObject = {value: value, unit:unit};
      propagation.push(propagationObject)
    }

    propagate = [
      keyframes`
        25% {transform: translateX(-${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        50% {transform: translateX(-${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        75% {transform: translateX(-${`${propagation[2].value}${propagation[2].unit}`}) scale(0.5)}
        95% {transform: translateX(0rem) scale(1)}
      `,
      keyframes`
        25% {transform: translateX(-${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        50% {transform: translateX(-${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        75% {transform: translateX(-${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        95% {transform: translateX(0rem) scale(1)}
      `,
      keyframes`
        25% {transform: translateX(-${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        75% {transform: translateX(-${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        95% {transform: translateX(0rem) scale(1)}
      `,
      keyframes`
        25% {transform: translateX(${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        75% {transform: translateX(${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        95% {transform: translateX(0rem) scale(1)}
      `,
      keyframes`
        25% {transform: translateX(${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        50% {transform: translateX(${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        75% {transform: translateX(${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        95% {transform: translateX(0rem) scale(1)}
      `,
      keyframes`
        25% {transform: translateX(${`${propagation[0].value}${propagation[0].unit}`}) scale(0.75)}
        50% {transform: translateX(${`${propagation[1].value}${propagation[1].unit}`}) scale(0.6)}
        75% {transform: translateX(${`${propagation[2].value}${propagation[2].unit}`}) scale(0.5)}
        95% {transform: translateX(0rem) scale(1)}
      `
    ];

    return propagate;
  }

  public style: StyleFunctionWithIndex = (i: number): PrecompiledCss => {
    const { size, color } = this.props;
    const propagate = this.getPropagate();
    let { value, unit } = parseLengthAndUnit(size!);

    return css`
      position: absolute;
      font-size: ${`${value / 3}${unit}`};
      width: ${`${value}${unit}`};
      height: ${`${value}${unit}`};
      background: ${color};
      border-radius: 50%;
      animation: ${propagate[i]} 1.5s infinite;
      animation-fill-mode: forwards;
    `;
  };

  public wrapper: StyleFunction = (): PrecompiledCss => {
    return css`
      position: relative;
    `;
  };

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <div css={[this.wrapper(), css]}>
        <div css={this.style(0)} />
        <div css={this.style(1)} />
        <div css={this.style(2)} />
        <div css={this.style(3)} />
        <div css={this.style(4)} />
        <div css={this.style(5)} />
      </div>
    ) : null;
  }
}

export default Loader;

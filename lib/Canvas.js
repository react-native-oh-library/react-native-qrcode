'use strict';
import { WebView } from "@react-native-ohos/react-native-webview";
var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var {
    View,
    Platform,
    Text
} = require('react-native');

var Canvas = createReactClass({
    propTypes: {
        style: PropTypes.object,
        context: PropTypes.object,
        onLoad: PropTypes.func,
        onLoadEnd: PropTypes.func,
    },

    render() {
        var contextString = JSON.stringify(this.props.context);
        const htmlContent = `
        <style>
        *{margin:0;padding:0;}canvas{transform:translateZ(0);}
        </style>
        <canvas id="react-native-qrcode-canvas"></canvas>
        <script>
        var canvas = document.getElementById("react-native-qrcode-canvas");
        var ctx = canvas.getContext('2d');
        var size = ${contextString}.size;
        var fgColor = ${contextString}.fgColor;
        var bgColor = ${contextString}.bgColor;
        canvas.width = size;
        canvas.height = size;
        canvas.style.left = (window.innerWidth - size) / 2 + 'px';
        if(window.innerHeight > size) canvas.style.top = (window.innerHeight - size) / 2 + 'px';
        ctx.fillRect(0, 0, size, size);
        var cells = ${contextString}.cells;
        var cellWidth = ${contextString}.size / cells.length;
        var cellHeight = ${contextString}.size / cells.length;
        var nRoundedWidth = Math.round(cellWidth);
        var nRoundedHeight = Math.round(cellHeight);
        cells.forEach(function(row, rowIndex) {
            row.forEach(function(column, columnIndex) {
                var nLeft = columnIndex * cellWidth;
                var nTop = rowIndex * cellHeight;
                ctx.fillStyle = ctx.strokeStyle = column ? bgColor : fgColor;
                ctx.lineWidth = 1;
                ctx.fillRect(nLeft, nTop, cellWidth, cellHeight);
                ctx.strokeRect(
                    Math.floor(nLeft) + 0.5,
                    Math.floor(nTop) + 0.5,
                    nRoundedWidth,
                    nRoundedHeight
                );
                ctx.strokeRect(
                    Math.ceil(nLeft) - 0.5,
                    Math.ceil(nTop) - 0.5,
                    nRoundedWidth,
                    nRoundedHeight
                );
            });
        });
        </script>
        `
        return (
            <View style={this.props.style}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={Platform.OS === 'android'}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: htmlContent}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={this.props.style}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    onLoad={this.props.onLoad}
                    onLoadEnd={this.props.onLoadEnd}
                    originWhitelist={['*']}
                />
            </View>
        );
    }
});

module.exports = Canvas;

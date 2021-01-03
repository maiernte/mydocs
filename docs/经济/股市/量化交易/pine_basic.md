[返回](经济/股市/量化交易/)

###### 在 function 中改变全局变量

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wallneradam
//@version=4
study("Global variables", overlay=false)

// Declare constants to access global variables
IDX_STOCH = 0
IDX_RSI = 1

// Initialize an empty array to store variables
global = array.new_float(2)

// This is the modify the array
calculate(period) =>
    v_stoch = stoch(close, high, low, period)
    v_rsi = rsi(close, period)
    array.set(global, IDX_STOCH, v_stoch)
    array.set(global, IDX_RSI, v_rsi)
     
// Call the function any times you want
calculate(14)
// Plot the results
plot(array.get(global, IDX_STOCH), color=color.red)
plot(array.get(global, IDX_RSI), color=color.yellow)
// Call the function any times you want
calculate(14 * 5)
// Plot the results
plot(array.get(global, IDX_STOCH), color=color.maroon)
plot(array.get(global, IDX_RSI), color=color.olive)
```
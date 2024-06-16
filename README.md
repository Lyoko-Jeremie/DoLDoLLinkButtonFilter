# DoLLinkButtonFilter

---

this mod add a filter to the link button in the DoL page

it extends the link/button to have a filter option


---

origin:

```
<<link "MirrorMirror" "asdasdasd">><</link>>
<<link [[MirrorMirror2|Bedroom]]>><</link>>
<<link [[aaaaabbbbbccccc('aaa')|Mirror]]>><</link>>
```

to:

```
<<link "MirrorMirror" "asdasdasd" [[true]]>><</link>>
<<link [[MirrorMirror2|Bedroom]] [[true]]>><</link>>
<<link [[aaaaabbbbbccccc('aaa')|Mirror]] [[true]]>><</link>>
```

---

the format is:

```
<<link [[ShowString|TatgetPassageName(must exist)]] [[ATwineScriptThatReturnTruyToBlockGameOriginAction|ATwineScriptWillExecutAfterFilter]]>><</link>>
```

```
<<link [[显示字符串|要跳转的PassageName(Passage必须存在)]] [[一个TwineScript，返回值决定是否要拦截跳转|一个可选的TwineScript，在拦截后执行]]>><</link>>
```

---

## 说明

本addon在游戏原始的link按钮上添加了一个过滤器功能

过滤参数放在原游戏的link按钮的最后一个参数位置

有以下几种格式

```
<<link "显示字符串" "要跳转的PassageName" [[拦截检测脚本]]>><</link>>
<<link "显示字符串" "要跳转的PassageName" [[拦截检测脚本|拦截后执行脚本]]>><</link>>

<<link [[显示并跳转的PassageName]] [[拦截检测脚本]]>><</link>>
<<link [[显示并跳转的PassageName]] [[拦截检测脚本|拦截后执行脚本]]>><</link>>

<<link [[显示字符串|要跳转的PassageName(Passage必须存在)]] [[拦截检测脚本]]>><</link>>
<<link [[显示字符串|要跳转的PassageName(Passage必须存在)]] [[拦截检测脚本|拦截后执行脚本]]>><</link>>

```

如果需要一个永不执行跳转的按钮，可以使用以下格式

```
<<link [[显示字符串|Bedroom]] [[true]]>><</link>>
<<link [[显示字符串|Bedroom]] [[true|拦截后执行脚本]]>><</link>>
```

对于 `[[拦截检测脚本|拦截后执行脚本]]` ，其中的 `拦截检测脚本` 和 `拦截后执行脚本`
都是TwineScript，会被 `Scripting.evalTwineScript` 执行

其中的 `拦截检测脚本`
会读取执行的返回值，如果返回值为 [`Truthy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) ，则会拦截跳转，
如果返回 [`Falsy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) ，则会保持link/button原有的行为

`拦截后执行脚本` 会在拦截后执行，如果不存在或者没有拦截，则不执行。

特别的，如果 `拦截后执行脚本` 字符串与 `拦截检测脚本` 的字符串忽略前后空格后一样，也不会运行 `拦截后执行脚本` 。

其中，`拦截检测脚本` 和 `拦截后执行脚本` 都可以使用定义在 globalThis 和 window 下的函数和变量，以及在`<<set xxx >>`语法中可以使用的写法

---

### 用途:

---

test code:

```json5
{
  "addonPlugin": [
    {
      "modName": "ReplacePatcher",
      "addonName": "ReplacePatcherAddon",
      "modVersion": "1.0.0",
      "params": {
        "js": [
        ],
        "css": [
        ],
        "twee": [
          {
            "passageName": "Bedroom",
            "from": "You are in your bedroom.",
            "to": "You are in your bedroom.\n<<link [[aaaaabbbbbccccc('aaa')|Mirror]] \"asdasdasd\" [[true]]>><</link>>"
          },
          {
            "passageName": "Bedroom",
            "from": "You are in your bedroom.",
            "to": "You are in your bedroom.\n<<link \"MirrorMirror\" \"asdasdasd\" [[true]]>><</link>>"
          },
          {
            "passageName": "Bedroom",
            "from": "You are in your bedroom.",
            "to": "You are in your bedroom.\n<<link [[MirrorMirror2|Bedroom]] [[true|console.log(\"MirrorMirror2\")]]>><</link>>"
          },
          {
            "passageName": "Bedroom",
            "from": "You are in your bedroom.",
            "to": "You are in your bedroom.\n<<link \"MirrorMirror3\" [[true]]>><</link>>"  // will error
          }
        ]
      }
    }
  ],
}
```

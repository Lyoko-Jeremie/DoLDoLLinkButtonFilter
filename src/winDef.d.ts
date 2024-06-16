import type {SC2DataManager} from "../../../dist-BeforeSC2/SC2DataManager";
import type {ModUtils} from "../../../dist-BeforeSC2/Utils";
import type jQuery from "jquery/misc";

declare global {
    interface Window {
        modUtils: ModUtils;
        modSC2DataManager: SC2DataManager;

        jQuery: jQuery;
    }

    var Macro: {
        add: (name: string | string[], def) => any;
        delete: (name: string) => any;
        isEmpty: () => any;
        has: (name: string) => any;
        get: (name: string) => any;
    };

    interface Window {
        DoLLinkButtonFilter_patchLinkButton: (
            MacroRef: typeof Macro,
            ScriptingRef: typeof Scripting,
        ) => void;
    }

    const Wikifier: WikifierAPI;
    const Scripting: ScriptingAPI;

}

export interface WikifierAPI {
    new(destination: OutputDestination | null, source: string, options?: WikifierOptions): unknown;

    createExternalLink(destination: OutputDestination, url: string, text: string): HTMLAnchorElement;

    createInternalLink(
        destination: OutputDestination,
        passage: string,
        text: string,
        callback: () => void,
    ): HTMLAnchorElement;

    isExternalLink(link: string): boolean;

    wikifyEval(text: string): DocumentFragment;
}

export interface ScriptingAPI {
    parse(rawCodeString: string): string;

    /**
     * Evaluates the given JavaScript code and returns the result, throwing if there were errors.
     */
    evalJavaScript(code: string): any;

    /**
     * Evaluates the given TwineScript code and returns the result, throwing if there were errors.
     */
    evalTwineScript(code: string): any;
}

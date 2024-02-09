import { promises as fs } from "fs";
import path from "path";

import Article from "../../../domain/Article/Article";
import { publickeyFeed } from "../../../domain/BlogFeed/BlogFeed";
import SsmlBuilder, { ArticleAndHtml } from "../../../domain/EpisodeAudio/SsmlBuilder";

describe("SsmlBuilder", () => {
  describe("#build", () => {
    it("記事 HTML から SSML を生成する", async () => {
      const ssmlBuilder = new SsmlBuilder();
      const html1 = await fs.readFile(
        path.resolve("tests/__fixtures__/html/www.publickey1.jp/blog/24/awsfinchwindows.html"),
        "utf-8",
      );
      const articleAndHtml1: ArticleAndHtml = {
        article: Article.createNew({
          url: "https://www.publickey1.jp/blog/24/awsfinchwindows.html",
          title: "AWS、オープンソースのコンテナ開発ツール「Finch」のWindows版リリース。コンテナのビルドや実行環境一式",
          publishedAt: new Date(2024, 2 - 1, 6),
          blogFeedUrl: publickeyFeed.url,
        }),
        html: html1,
      };
      const html2 = await fs.readFile(
        path.resolve(
          "tests/__fixtures__/html/www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html",
        ),
        "utf-8",
      );
      const articleAndHtml2: ArticleAndHtml = {
        article: Article.createNew({
          url: "https://www.publickey1.jp/blog/24/javascripttypescriptosbun_shelljavascriptbun.html",
          title:
            "シェルスクリプトをJavaScript/TypeScriptで記述、どのOSでも実行できる「Bun Shell」、JavaScriptランタイムのBunが発表",
          publishedAt: new Date(2023, 1 - 1, 30),
          blogFeedUrl: publickeyFeed.url,
        }),
        html: html2,
      };
      const expectedSsml = `<speak>
最初の記事です。
タイトル<break time="0.5s"/>シェルスクリプトをJavaScript/TypeScriptで記述、どのOSでも実行できる「Bun Shell」、JavaScriptランタイムのBunが発表<break time="1s"/>公開日<break time="0.5s"/>2023年1月30日<break time="1s"/>
JavaScriptランタイムのBunは、新機能としてシェルスクリプトをJavaScriptもしくはTypeScriptで記述し、特定のOSに依存せずに実行できる「Bun Shell」を発表しました。<break time="1s"/>見出し<break time="0.5s"/>シェルスクリプトは特定のシェルに依存するもの<break time="1s"/>LinuxやmacOS、WindowsなどのOSは一般に、「シェル」（Shell）と呼ばれる機能を備えています。シェルはコマンドラインインターフェイスなどのユーザーとの対話機能を備えており、例えばLinuxのコマンドラインで「ls」コマンドを打ち込むとファイルの一覧が返ってくるという動作はシェルが提供しています。そしてシェルでは一般に、こうしたコマンドを複数つなげた一連の動作をスクリプトとして定義し実行できる「シェルスクリプト」が利用可能です。例えば、次のシェルスクリプトは、「ls」コマンドによるファイルの一覧をファイル「list.txt」に書き込んでいます。<break time="1s"/>ここにコードが入ります。<break time="1s"/>シェルスクリプトはプログラミング言語の一種であり、簡単な処理であればさっとシェルスクリプトで記述して実行してしまう、ということはプログラマのあいだでよく行われていることです。ただしシェルには複数の種類があります。例えばLinuxでは「sh」や「bash」や「zsh」などが、Windowsでも以前から提供されているコマンドラインツールの「cmd」に加えてより高機能な「PowerShell」などがあり、好みや用途に合わせて使い分けることができます。しかしそれぞれのシェルスクリプトの記述は微妙に異なることが多く、あるシェル用に書いたシェルスクリプトは別のシェルでは動作が保証されません。また、LinuxやmacOSとWindowsでは使えるコマンドも異なるため（例えばLinuxの「ls」に相当するコマンドはWindowsでは「dir」など）、シェルスクリプトは基本的に、特定のOSの特定のシェルに依存して記述され、実行されるものでした。<break time="1s"/>見出し<break time="0.5s"/>JavaScript/TypeScriptでクロスプラットフォームなシェルスクリプト<break time="1s"/>今回発表されたBunは、このシェルスクリプトをプログラマが使い慣れたJavaScriptもしくはTypeScriptで記述でき、LinuxやmacOS、WindowsのOSやシェルの種類に依存せず、どこでも同様に実行できるクロスプラットフォーム対応という2つの利点を提供するものです。下記はBun Shellのシンプルなサンプルコードとして、拡張子が「.js」のファイルの一覧を標準出力に出力するコードです。<break time="1s"/>ここにコードが入ります。<break time="1s"/>1行目のimport文は、Bun Shellの実行環境を読み込んでいます。3行目の「await」は、コマンドの処理が終わるまで待つことを指定するコマンド。「$」でBun Shell
の実行を指定し、バッククオート（\`）で囲まれた文字列が実行される中味となります。もちろん、パイプやリダイレクトも使えます。下記はパイプの例。<break time="1s"/>ここにコードが入ります。<break time="1s"/>環境変数のセットも可能。環境変数「FOO」を「foo」にセットする例。<break time="1s"/>ここにコードが入ります。<break time="1s"/>JavaScriptの変数をBun Shellスクリプト内で使えるのは面白いところかもしれません。<break time="1s"/>ここにコードが入ります。<break time="1s"/>Bun Shellスクリプトをファイルとして記述し、拡張子「.bun.sh」を付けてBunに渡すと、Bun Shellスクリプトとして実行してくれます。<break time="1s"/>ここにコードが入ります。<break time="1s"/>Bun Shellは現在実験的実装の段階で、主要なシェルコマンドなどを実装していくとしています。<break time="1s"/>見出し<break time="0.5s"/>Bunはいかにして競合と差別化するか？<break time="1s"/>BunはJavaScriptランタイムとして、Node.jsやDenoとの競合と位置づけられています。しかしエコシステムの面で先行するNode.jsや商用サービスのDeno Deployなどを展開中のDenoに対して、Bunが大きく先行する点が明確にあるとはいえない状態です。そうした中で、今回のBun Shellの提供は、開発者にとって身近で手軽なツールとしてBunを位置づけたいという目論見があるように見えます。<break time="1s"/>
次の記事です。<break time="0.5s"/>
タイトル<break time="0.5s"/>AWS、オープンソースのコンテナ開発ツール「Finch」のWindows版リリース。コンテナのビルドや実行環境一式<break time="1s"/>公開日<break time="0.5s"/>2024年2月6日<break time="1s"/>
AWSは、ローカルマシン上にLinuxコンテナのランタイム、ビルドツール、コマンドラインツールなど一式を簡単にインストールし、コンテナを用いた開発環境を開始できるソフトウェア「Finch」のWindows版を公開しました。Finchは以前からIntelプロセッサもしくはAppleシリコン搭載のMacに対応していました。今回のWindows対応によってmacOSとWindowsの両方に対応したことになります。 Finch 1.0 has arrived! The #opensource source project has reached a significant breakthrough. Finch is now available for Windows Developers. Learn how to install Finch on Windows and contribute here: https://t.co/ayYpo08giE #opensource #developers #containers pic.twitter.com/jxXA44jzL6— AWS Open Source (@AWSOpen) February 1, 2024参考：AWS、Docker Desktop代替となり得る「Finch」をオープンソースで公開。ローカルマシンに仮想環境とコンテナランタイム、ビルドツールなど一式を導入Finchは、Docker DesktopやRancher Desktopのように、ローカルマシンにコンテナランタイムやビルドツールなどのコンテナ環境一式を簡単に導入できるソフトウェアです。ただしDocker Desktopのようなグラフィカルなインターフェイスを持たず、すべてをコマンドラインから操作するコマンドラインツールによって構成されているのが特徴です。<break time="1s"/>見出し<break time="0.5s"/>Windows上にコンテナ関連ツール一式を簡単に導入<break time="1s"/>Windows版のFinchは、Windows内でLinux環境を提供するWSL 2（Windows Subsystem for Linux 2）を用いており、そのLinux環境に「finch-lima」と呼ばれるLinuxディストリビューションを導入、実行し、このfinch-limaのLinux上でコンテナのビルドや実行などを行います。Windows版Finchの構成はmacOS版と同様に、OS上にLinux仮想マシンを構築する「Lima」、Limaの中にデフォルトで含まれているコンテナランタイムのcontainerd、ビルドツールの「BuildKit」、Dockerを用いなくともDockerコマンドのようにコマンドラインからcontainerd経由でコンテナを操作できる「nerdctl」（nerdctlのnerdはcontainerdのnerd）などです。今回Windows版が実現したのは、macOS上にLinux仮想マシンを構築するLimaをWSL 2にも対応させたことによると説明されています。以上で終わりです。
</speak>`;

      const ssml = ssmlBuilder.build(publickeyFeed.url, [articleAndHtml1, articleAndHtml2]);
      expect(ssml).toEqual(expectedSsml);
    });
  });
});

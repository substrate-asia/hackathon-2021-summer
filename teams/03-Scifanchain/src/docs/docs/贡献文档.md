##  在贡献文档前需要做的准备工作

我们基于Markdown来编写文档，使用Mkdocs来管理和生成静态站点，采用githup的Pages服务部署。欢迎所有的社区成员为文档贡献内容，以帮助新成员们得到好的指导。

### 安装Python

Scifanchain的文档使用Mkdocs程序构建，这是一个优秀的Python工具，要使用它需要安装Python。不，您并不需掌握Python语言，只是需要在您的电脑上安装它即可以。

在Linux或Mac Os系统中，Python通常已经被预安装好了，您可以在终端通过以下命令验证一下版本：

    python --version

建议使用Python3版本。我们暂时还没有验证在Python2的版本下Mkdocs是否可以正常使用。

[在Windows上安装 Python](https://docs.python.org/zh-cn/3/using/windows.html#installation-steps)

###  安装Mkdocs

安装好Python3以后，就可以打开终端，使用以下命令安装Mkdocs：

    pip3 install mkdocs

更详细的教程，请参考：[pmkdocs的安装和使用](https://markdown-docs-zh.readthedocs.io/)

### 安装git

我们使用git来进行协作。用户为文档贡献内容，只需要掌握git pull命令从github仓库中获取最新内容。Mkdocs提供了一键发布到github的功能，所以不需要commit和push。

### 学习一些简单的Markdown语法

Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用。

[Markdown教程](https://markdown.com.cn/)

## 编辑文档

Scifanchain在github上代码开源，本文档在 https://github.com/scifanchain/web/docs 目录下，该目录下还有一个docs目录和一个site目录，其中docs目录下存放着的，就是本文档的内容，它们是以.md为扩展名的Markdown格式文本。

### a) 在github拥有提交代码权限

如果您在github上加入Scifanchain组织成员，那么您应该拥有修改提交代码的权限，可以直接git clone该目录，然后用以下命令切换到gh-pages分支，以git方式提交：

    git checkout gh-pages

***特别需要注意的是：*** 我们在github的Pages中，部署的是 https://github.com/scifanchain/web/ 的gh-pages分支，所以您提交代码时务必要切换到gh-pages分支。

### b) Fork并clone文档代码

如果您没有github上的代码提交权限，可以用提交PR的方式申请合并内容。首先，您需要fork web仓库，使用以下命令，将web仓库的代码clone到本地。fork之后的仓库地址应该像以下这样：

    git@github.com:your_github_username/web.git

如图所示：

![fork仓库](img/fork_github.jpeg)

在本地编写完内容后，在项目\scifanchain\docs>目录下，执行以下命令发布到github：

    mkdocs gh-deploy

接下来，打开https://docs.scifanchain.com，就可以看到您新编辑的文档了。

祝开心顺利！

# https

## https是什么

HTTPS(全称： Hypertext Transfer Protocol over Secure Socket Layer)，是以安全为目标的HTTP通道, 在HTTP的基础上通过传输协议加密和身份认证保证了传输过程的安全性。

## 为什么需要https

HTTPS在HTTP的基础下加入SSL/TLS，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。HTTPS存在于不同于HTTP的默认端口及一个加密/身份验证层（在HTTP和TCP之间）。
http信息是明文传输，数据不安全，在某些情况下，比如交易支付，身份认证等信息需要保密的情况下，则需要https的加密通讯来保证数据的安全。

## SSL

> HTTP在传输数据中使用明文是不安全的，为了解决这个问题，网景公司(Netscape)推出了`SSL`安全套接字协议层。
> SSL是基于HTTP之下TCP之上的一个协议层，是基于HTTP标准并对于TCP传输数据时进行加密，所以HTTPS是HTTP + SSL / TCP的简称。

SSL(全称：Secure Socket Laye), 安全套接字层。SSL是Netscape开发的位于可靠的面向连接的网络层协议(如TCP/IP)和应用层协议之间的一种协议。通过互相认证、使用数字签名确保完整性、使用加密确保私密性，以实现客户端和服务器之间的安全通讯。

SSL现在有1, 2, 3，共三个版本，市面上基本使用的是3.0版本。

### SSL协议组成

SSL协议 由 SSL记录协议 + SSL握手协议组成。

`记录协议（SSL Record Protocol）`：它建立可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能支持。

`握手协议（SSL Record Protocol）`：它建立在SSL记录协议之上，用于在实际数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。

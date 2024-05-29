# Airdrop Bot

This is a script for automatic interaction with the onchain protocol by setting up Cronjobs and delay times

# Supported protocols

1. Base AAVE
   - Deposit ETH -> approve -> withdraw
2. Base Uniswap
   - Swap DAI <-> ETH

# Getting started

1. Install CLI globally

```bash
npm install -g airdrop-bot
```

2. Check version

```bash
airdrop-bot -v
# 0.0.1
```

3. Interact protocols (AAVE / Uniswap)

For example, interact aave by 0.01 ETH and setup delay 10 minutes

```bash
# set your private key to environment variables
export PK=<your-private-key>

# check private key
echo $PK
```

```bash
# execute AAVE
airdrop-bot aave $PK 0.01 -c "0 */10 * * * *" --delay 10
```

Notice: cron job expression is from **second** not minute

---

If successfully started, the following information should appear.

```bash
> base-bot@1.0.0 app
> ts-node ./app.ts

  ____   ___ _____
 | __ ) / _ \_   _|
 |  _ \| | | || |
 | |_) | |_| || |
 |____/ \___/ |_|

Starting app ...
Chain Base
Time 0 */10 * * * * | Delay 10 minutes
Account <Public address from $PK>
```

Print below information when starting a new round

- Trigger start / end time (time zone: Asia/Taipei)
- Random delay seconds (limit base on `--delay` command option)
- Each txs hash and status (retry sent tx if status is `reverted`)

```bash
Start new round
Start time: 2024/5/3 下午1:00:00 | Delay 247 seconds
Deposit...
Tx Hash: 0xa887c685952643c819be509ed738d8f49dc519f9b523b3e3741d9af56b484757 - reverted
Reverted !! Retrying...
Tx Hash: 0x463199026a129c43240bc5860a44c811fbd273b0ad9ea2e11ece02436d4d81cd - success
Approving...
Tx Hash: 0xc5dc4df1556dcf4d8f091da1258ff0649dd1e3a252fdf9780764ea06d12e423d - success
Withdraw...
Tx Hash: 0x58fa1b26670aac621c358828b08651ae46d3a253410ef9177038b757fcdef785 - reverted
Reverted !! Retrying...
Tx Hash: 0x708e3d639d60d11d96b2d6d45428b1a4b90ecda9b529a2eee52a0a36b09acfb8 - reverted
Reverted !! Retrying...
Tx Hash: 0x841ad67167fc6478a0f6024493f9c6cdb8df3b877ee167415b3d05d0e1b600e5 - success
Contract address 0x8be473dCfA93132658821E67CbEB684ec8Ea2E74
End time 2024/5/3 下午1:05:24
```

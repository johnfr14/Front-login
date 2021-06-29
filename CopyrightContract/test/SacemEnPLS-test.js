/* eslint-disable quotes */
/* eslint-disable no-undef */

const { expect } = require('chai');

describe('sacemEnPLS', function () {
  let deployer, alice, bob, CPR, cpr;

  beforeEach(async function () {
    [deployer, alice, bob, SRO, sarahRo] = await ethers.getSigners();
    CPR = await ethers.getContractFactory('SacemEnPLS');
    cpr = await CPR.connect(deployer).deploy();
    await cpr.deployed();
  });

  describe('contructor', async () => {
    it("Should have created a NFT contract of name 'Copyright', and Symbol 'CPR", async function () {
      expect(await cpr.name()).to.equal('Copyright');
      expect(await cpr.symbol()).to.equal('CPR');
    });
  });

  describe('createCopyright', async () => {
    let NFT;
    beforeEach(async function () {
      NFT = {
        contentHash: "0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb9",
        content: "coucou",
        title: "le coucou",
        author: "john",
        url: "https://infura.io/dashboard/ipfs",
        timeStamp: new Date().toDateString(),
      };
    });

    it("Revert if someone already created that NFT", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      await expect(cpr.connect(bob).createCopyRight(NFT, bob.address))
        .to.revertedWith("SacemEnPLS: sorry this content is already owned by someone");
    });
    it("Should increment the state variable _tokenIds", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      expect(await cpr.connect(bob).totalSupply())
        .to.equal(1);
      NFT.contentHash = "0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb8";
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      expect(await cpr.connect(bob).totalSupply())
        .to.equal(2);
    });
    it("Should mint the NFT to the owner address", async function () {
      await cpr.connect(alice).createCopyRight(NFT, bob.address);
      expect(await cpr.balanceOf(bob.address)).to.equal(1);
      expect(await cpr.balanceOf(alice.address)).to.equal(0);
    });
    it("Should find the right NFT with his ID", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      const nft = await cpr.connect(alice).getCPRById(1);
      expect(nft.content).to.equal("coucou");
    });
    it("Should find the right ID with the hash of the content NFT", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      const nft = await cpr.connect(alice).getCPRById(1);
      expect(await cpr.connect(alice).getCPRByHash(nft.contentHash)).to.equal(1);
    });
  });

  describe('getCPRById', async () => {
    let NFT;
    beforeEach(async function () {
      NFT = {
        contentHash: "0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb9",
        content: "coucou",
        title: "le coucou",
        author: "john",
        url: "https://infura.io/dashboard/ipfs",
        timeStamp: new Date().toDateString(),
      };
    });

    it("Should return the NFT assossiated with the id", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      const nft = await cpr.connect(alice).getCPRById(1);
      expect(nft.contentHash).to.equal("0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb9");
      expect(nft.content).to.equal("coucou");
      expect(nft.title).to.equal("le coucou");
      expect(nft.author).to.equal("john");
      expect(nft.url).to.equal("https://infura.io/dashboard/ipfs");
      expect(nft.timeStamp).to.equal(new Date().toDateString());
    });
  });

  describe('getCPRByHash', async () => {
    let NFT;
    beforeEach(async function () {
      NFT = {
        contentHash: "0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb9",
        content: "coucou",
        title: "le coucou",
        author: "john",
        url: "https://infura.io/dashboard/ipfs",
        timeStamp: new Date().toDateString(),
      };
    });

    it("Should return the ID assossiated with the nft hash", async function () {
      await cpr.connect(alice).createCopyRight(NFT, alice.address);
      const nft = await cpr.connect(alice).getCPRById(1);
      expect(nft.contentHash).to.equal("0x4b0e2df202b433cb39d49fe68ebc16734426f4993fdc74b296464191fd51bdb9");
    });
  });
});

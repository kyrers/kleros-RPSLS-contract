import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HasherModule = buildModule("HasherModule", (m) => {
  const Hasher = m.contract("Hasher");
  return { Hasher };
});

export default HasherModule;

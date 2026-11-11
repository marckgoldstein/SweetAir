export function createDemoObjectStorage() {
  const objects = new Map();

  return {
    async upload(file, { folder = "uploads" } = {}) {
      if (!(file instanceof File)) {
        throw new TypeError("A file is required to upload an object.");
      }
      const key = `${folder}/${crypto.randomUUID()}-${file.name}`;
      const url = URL.createObjectURL(file);
      objects.set(key, url);
      return { key, url, contentType: file.type, size: file.size };
    },
    async getPublicUrl(key) {
      const url = objects.get(key);
      if (!url) {
        throw new Error(`No demo object exists for "${key}".`);
      }
      return url;
    },
    async remove(key) {
      const url = objects.get(key);
      if (!url) {
        throw new Error(`No demo object exists for "${key}".`);
      }
      URL.revokeObjectURL(url);
      objects.delete(key);
    },
  };
}

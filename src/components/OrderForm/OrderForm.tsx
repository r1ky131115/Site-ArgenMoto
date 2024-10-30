// src\components\OrderForm\OrderForm.tsx probar usar un alert para el mensaje <Alert icon
import React, { useState } from 'react';
import './OrderForm.css';

interface Product {
  type: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Provider {
  id: string;
  name: string;
  address: string;
  contact: string;
}

const OrderForm: React.FC = () => {
  const [providers] = useState<Provider[]>([
    { id: '1', name: 'Proveedor A', address: 'Calle Falsa 123', contact: '123-4567' },
    { id: '2', name: 'Proveedor B', address: 'Avenida Siempreviva 742', contact: '987-6543' },
    { id: '3', name: 'Proveedor C', address: 'Calle Luna 321', contact: '456-7890' },
  ]);

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState(0);

  const unitPrices: { [key: string]: number } = {
    productA: 10,
    productB: 20,
    productC: 15,
  };

  const calculateTotalPrice = () => unitPrices[productType] * quantity;

  const handleAddProduct = () => {
    const unitPrice = unitPrices[productType] || 0;
    const newProduct: Product = {
      type: productType,
      quantity,
      unitPrice,
      totalPrice: calculateTotalPrice(),
    };
    setProducts([...products, newProduct]);
    setProductType('');
    setQuantity(0);
  };

  const handleGenerateOrder = async () => {
    const orderDate = new Date().toLocaleDateString();
    const totalAmount = products.reduce((sum, product) => sum + product.totalPrice, 0);

    const orderData = {
      provider: selectedProvider,
      date: orderDate,
      products,
      total: totalAmount,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Error al generar la orden de compra');
      }
      window.alert("Orden generada con éxito"); // Mostrar el mensaje de éxito con alert
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-form">
      <h2>Generar Orden de Compra</h2>

      {/* Selección del Proveedor */}
      {!selectedProvider ? (
        <div>
          <label>Seleccionar Proveedor</label>
          <select
            onChange={(e) => {
              const provider = providers.find((p) => p.id === e.target.value);
              setSelectedProvider(provider || null);
            }}
          >
            <option value="">Seleccione un proveedor</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="provider-info">
          <h3>Proveedor Seleccionado</h3>
          <p><strong>Nombre:</strong> {selectedProvider.name}</p>
          <p><strong>Dirección:</strong> {selectedProvider.address}</p>
          <p><strong>Contacto:</strong> {selectedProvider.contact}</p>
        </div>
      )}

      {/* Formulario de Productos (solo se muestra si hay proveedor seleccionado) */}
      {selectedProvider && (
        <>
          <div>
            <label>Tipo de Producto</label>
            <select value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="">Seleccione un producto</option>
              <option value="productA">Producto A</option>
              <option value="productB">Producto B</option>
              <option value="productC">Producto C</option>
            </select>
          </div>
          <div>
            <label>Cantidad</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Precio Unitario</label>
            <span>{unitPrices[productType] || 0}</span>
          </div>
          <div>
            <label>Precio Total</label>
            <span>{calculateTotalPrice()}</span>
          </div>
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </>
      )}
      

      {selectedProvider && (
        <button onClick={handleGenerateOrder}>Generar Orden de Compra</button>
      )}

      {/* Mostrar Resumen Final */}
      {selectedProvider && (
        <div className="order-summary">
          <h3>Resumen de la Orden</h3>
          <p><strong>Proveedor:</strong> {selectedProvider.name}</p>
          <p><strong>Dirección:</strong> {selectedProvider.address}</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          <ul>
            {products.map((product, index) => (
            <li key={index}>
              {product.type} - {product.quantity} x ${product.unitPrice} = ${product.totalPrice}
             </li>
        ))}
      </ul>
          <p><strong>Total:</strong> ${products.reduce((sum, product) => sum + product.totalPrice, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
